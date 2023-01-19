using ShareX.HelpersLib;
using ShareX.Properties;
using System;
using System.IO;
using System.Windows.Forms;

namespace ShareX
{
    public class ImageData : IDisposable
    {
        public MemoryStream ImageStream { get; set; }
        public EImageFormat ImageFormat { get; set; }

        public bool Write(string filePath)
        {
            try
            {
                if (ImageStream != null && !string.IsNullOrEmpty(filePath))
                {
                    return ImageStream.WriteToFile(filePath);
                }
            }
            catch (Exception e)
            {
                DebugHelper.WriteException(e);

                string message = $"{Resources.ImageData_Write_Error_Message}\r\n\"{filePath}\"";

                if (e is UnauthorizedAccessException || e is FileNotFoundException)
                {
                    message += "\r\n\r\n" + Resources.YourAntiVirusSoftwareOrTheControlledFolderAccessFeatureInWindowsCouldBeBlockingShareX;
                }
                
                MessageBox.Show(message, "ShareX - " + Resources.Error, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

            return false;
        }

        public void Dispose()
        {
            ImageStream?.Dispose();
        }
    }
}