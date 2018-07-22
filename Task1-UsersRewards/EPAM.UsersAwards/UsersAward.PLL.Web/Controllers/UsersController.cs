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
    public class UsersController : Controller
    {
        private UserPictureBllModel bllModel;

        public UsersController(UserPictureBllModel model)
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
            var model = bllModel.GetAllUsersWithAwards();
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

                return View(user);
            }

            return View(user);
        }

        public ActionResult Delete(int id)
        {
            var model = bllModel.GetUser(id);
            return View(model);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult DeleteUser(int id)
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

        public ActionResult Edit(int id)
        {
            var user = bllModel.GetUserById(id);

            if (user == null)
            {
                return HttpNotFound();
            }

            var userModel = Mapper.Map<EditUserVM>(user);

            return View(userModel);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Edit(EditUserVM user)
        {
            if (ModelState.IsValid)
            {
                if (bllModel.UpdateUser(user, Request))
                {
                    return RedirectToAction("Index");
                }

                return View(user);
            }
            return View(user);
        }

        public ActionResult Details(int id)
        {
            var userModel = bllModel.GetDetailedUser(id);

            if (userModel == null)
            {
                return HttpNotFound();
            }

            return View(userModel);
        }

        public ActionResult GetImageById(Guid id)
        {
            ImageDTO img = bllModel.GetImageById(id);

            return File(img.Data, img.Type);

        }

        public ActionResult AddAwardToUser(int userId, int awardId)
        {
            bllModel.AddAwardToUser(userId, awardId);
            return RedirectToAction("Details", "User", new { id = userId });
        }

        public FileContentResult DownloadUsers()
        {
            var fileResult = bllModel.GetFileWithUsers();
            return File(fileResult.bytes, fileResult.type, "All Users");
        }

        public ActionResult DeleteUserImage(Guid ownerId)
        {
            if (bllModel.DeleteUserImage(ownerId))
            {
                return RedirectToAction("Index");
            }

            return RedirectToAction("Index");
        }
    }
}