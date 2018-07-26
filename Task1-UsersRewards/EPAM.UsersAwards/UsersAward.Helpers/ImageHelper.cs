using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace UsersAward.Helpers
{
    public static class ImageHelper
    {
        public static byte[] ResizeAndGetBytes(this Image sourceImage, int newWidth, int newHeight, bool reduceOnly)
        {
            var img = sourceImage.Resize(newWidth, newHeight, reduceOnly);

            byte[] data;
            using (var memory = new MemoryStream())
            {
                img.Save(memory, ImageFormat.Png);
                data = memory.ToArray();
            }

            return data;
        }

        public static Image Resize(this Image sourceImage, int newWidth, int newHeight, bool reduceOnly)
        {
            // Гарантия того, что не будет использована сохранённая внутри изображения миниатюра
            sourceImage.RotateFlip(RotateFlipType.Rotate180FlipNone);
            sourceImage.RotateFlip(RotateFlipType.Rotate180FlipNone);

            if (reduceOnly)
            {
                if (sourceImage.Width <= newWidth)
                {
                    newWidth = sourceImage.Width;
                }

                if (sourceImage.Height <= newHeight)
                {
                    newHeight = sourceImage.Height;
                }
            }

            Image newImage = sourceImage.GetThumbnailImage(newWidth, newHeight, null, IntPtr.Zero);
            return newImage;
        }
    }
}