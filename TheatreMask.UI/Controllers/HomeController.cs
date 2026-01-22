using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TheatreMask.UI.Models;
using TheatreMask.UI.Views.Home;

namespace TheatreMask.UI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var model = new IndexModel();
            model.OnGet();
            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
