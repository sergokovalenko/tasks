using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class UserController : Controller
    {
        private UserPictureBllModel bllModel;

        public UserController(UserPictureBllModel model)
        {
            this.bllModel = model;
        }

        //LEGACY
        public ActionResult AddImage()
        {
            return View();
        }

        //LEGACY
        [HttpPost]
        public ActionResult AddImage(HttpPostedFileBase uploaded)
        {
            byte[] bytes = new byte[uploaded.ContentLength];
            uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);
            var img = new ImageDTO()
            {
                OwnerId = Guid.NewGuid(),
                Data = bytes,
                Type = uploaded.ContentType
            };

            bllModel.Addimage(img);

            return View();
        }

        public ActionResult Index()
        {
            var model = Mapper.Map<IEnumerable<DisplayUserVM>>(bllModel.GetAllUsers());
            return View(model);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(CreateUserVM user)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.CreateUser(user, Request))
                {
                    return RedirectToAction("Index");
                }
                //сделать вывод об ошибке создания

                return View(user);
            }

            return View(user);
        }

        public ActionResult Delete(Guid id)
        {
            if (bllModel.DeleteUser(id))
            {
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }

        public ActionResult Edit(Guid id)
        {
            var user = bllModel.GetUserById(id);

            if (user == null)
            {
                return HttpNotFound();
            }

            var userModel = Mapper.Map<EditUserVM>(user);

            return View(userModel);
        }

        [HttpPost]
        public ActionResult Edit(EditUserVM user)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.UpdateUser(user, Request))
                {
                    return RedirectToAction("Index");
                }

                //сообщение об ошибке
                return View(user);
            }
            return View(user);
        }

        public ActionResult GetImageById(Guid id)
        {
            ImageDTO img = bllModel.GetImageById(id);

            if (img != null)
                return File(img.Data, img.Type);

            return null;
        }

        public FileContentResult DownloadUsers()
        {
            var fileResult = bllModel.GetFileWithUsers();
            return File(fileResult.bytes, fileResult.type, "All Users");
        }
    }
}