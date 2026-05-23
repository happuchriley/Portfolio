param(
  [string]$Source = "$PSScriptRoot\..\public\img\the-misfits-icon.png",
  [string]$OutDir = "$PSScriptRoot\..\public"
)

Add-Type -AssemblyName System.Drawing
$pf = [System.Drawing.Imaging.PixelFormat]::Format32bppArgb

$img = [System.Drawing.Bitmap]::FromFile($Source)
$w = $img.Width
$h = $img.Height
$lumCut = 22
$minX = $w; $minY = $h; $maxX = 0; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $c = $img.GetPixel($x, $y)
    $lum = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
    if ($lum -gt $lumCut) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

$cropRect = New-Object System.Drawing.Rectangle $minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1)
$cropped = $img.Clone($cropRect, $img.PixelFormat)
$img.Dispose()
$cw = $cropped.Width
$ch = $cropped.Height

function New-ProcessedBitmap($croppedBmp, $r, $g, $b) {
  $bmp = New-Object System.Drawing.Bitmap $cw, $ch, $pf
  for ($y = 0; $y -lt $ch; $y++) {
    for ($x = 0; $x -lt $cw; $x++) {
      $c = $croppedBmp.GetPixel($x, $y)
      $lum = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
      if ($lum -le 18) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      } else {
        $alpha = [Math]::Min(255, [int]($lum * 1.15))
        if ($alpha -lt 80) { $alpha = 80 }
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
      }
    }
  }
  return $bmp
}

function Save-Fit($source, $size, $pad, $path) {
  $inner = $size - (2 * $pad)
  $ratio = [Math]::Min($inner / $source.Width, $inner / $source.Height)
  $nw = [int]($source.Width * $ratio)
  $nh = [int]($source.Height * $ratio)
  $out = New-Object System.Drawing.Bitmap $size, $size, $pf
  $og = [System.Drawing.Graphics]::FromImage($out)
  $og.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
  $og.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $og.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $ox = [int](($size - $nw) / 2)
  $oy = [int](($size - $nh) / 2)
  $og.DrawImage($source, $ox, $oy, $nw, $nh)
  $og.Dispose()
  $out.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
}

$black = New-ProcessedBitmap $cropped 0 0 0
$white = New-ProcessedBitmap $cropped 255 255 255
$cropped.Dispose()

$sizes = @(
  @{ n = 'favicon-16x16.png'; d = 'favicon-16x16-dark.png'; s = 16; p = 0 },
  @{ n = 'favicon-32x32.png'; d = 'favicon-32x32-dark.png'; s = 32; p = 0 },
  @{ n = 'favicon-64x64.png'; d = 'favicon-64x64-dark.png'; s = 64; p = 0 },
  @{ n = 'apple-touch-icon.png'; d = 'apple-touch-icon-dark.png'; s = 192; p = 4 },
  @{ n = 'favicon.png'; d = 'favicon-dark.png'; s = 512; p = 8 }
)

foreach ($item in $sizes) {
  Save-Fit $black $item.s $item.p (Join-Path $OutDir $item.n)
  Save-Fit $white $item.s $item.p (Join-Path $OutDir $item.d)
}

$black.Dispose()
$white.Dispose()
Write-Host "Favicons generated (crop ${cw}x${ch})"
