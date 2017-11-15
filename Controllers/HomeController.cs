using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace save_the_pony.Controllers {
    
    public class HomeController : Controller {
        
        public IActionResult Index() {
            return View();
        }

        public IActionResult Error() {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
