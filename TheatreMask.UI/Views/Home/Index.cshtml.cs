using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TheatreMask.UI.Views.Home
{
    public class IndexModel : PageModel
    {
        public List<GalleryImage> GalleryImages { get; set; } = new();

        public void OnGet()
        {
            LoadGalleryImages();
        }

        private void LoadGalleryImages()
        {
            try
            {
                // Development: AppData/Gallery | Docker: /app/StaticFiles/Gallery (volume mount)
                var galleryPath = Environment.GetEnvironmentVariable("GALLERY_PATH") 
                    ?? Path.Combine(Directory.GetCurrentDirectory(), "AppData/Gallery");
                
                var imagesPath = Path.Combine(galleryPath, "images");

                if (Directory.Exists(imagesPath))
                {
                    var supportedExtensions = new[] { ".png", ".jpg", ".jpeg", ".gif", ".webp" };
                    var imageFiles = Directory.GetFiles(imagesPath)
                        .Where(f => supportedExtensions.Contains(Path.GetExtension(f).ToLower()))
                        .OrderBy(f => f)
                        .ToList();

                    GalleryImages = imageFiles
                        .Select((file, index) => new GalleryImage
                        {
                            Src = $"/app-images/images/{Path.GetFileName(file)}",
                            Alt = "Tiyatro Maske",
                            Id = $"img-{index + 1}"
                        })
                        .ToList();
                }
            }
            catch (Exception ex)
            {
                // Log error if needed
                Console.WriteLine($"Error loading gallery images: {ex.Message}");
            }
        }
    }

    public class GalleryImage
    {
        public string Src { get; set; } = string.Empty;
        public string Alt { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
    }
}
