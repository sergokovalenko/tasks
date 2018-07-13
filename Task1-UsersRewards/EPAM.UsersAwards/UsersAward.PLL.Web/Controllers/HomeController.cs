using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.PLL.Web.Models;

namespace UsersAward.PLL.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View(BLLManager.GetAllUsers());
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(UserVM user)
        {
            return View();
        }
    }
}