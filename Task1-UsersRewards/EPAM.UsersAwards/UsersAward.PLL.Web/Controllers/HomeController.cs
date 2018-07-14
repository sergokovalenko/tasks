using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var model = Mapper.Map<IEnumerable<DisplayUserVM>>(BLLManager.GetAllUsers());
            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }
    }
}