﻿using AutoMapper;
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
        private BllModel bllModel;

        public UserController(BllModel model)
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
                //TODO: разнести в логику
                var newUser = Mapper.Map<UserDTO>(user);

                if (bllModel.AddUser(newUser))
                {
                    var uploaded = user.Uploaded;
                    byte[] bytes = new byte[uploaded.ContentLength];
                    uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

                    var img = new ImageDTO()
                    {
                        OwnerId = newUser.Id,
                        Data = bytes,
                        Type = uploaded.ContentType
                    };

                    bllModel.Addimage(img);

                    return RedirectToAction("Index");
                }

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
                var updatedUser = Mapper.Map<UserDTO>(user);
                if (bllModel.UpdateUser(updatedUser))
                {
                    return RedirectToAction("Index");
                }
                return View(user);
            }
            return View(user);
        }

        public FileContentResult DownloadUsers()
        {
            var fileResult = bllModel.GetFileWithUsers();
            return File(fileResult.bytes, fileResult.type, "All Users");
        }
    }
}