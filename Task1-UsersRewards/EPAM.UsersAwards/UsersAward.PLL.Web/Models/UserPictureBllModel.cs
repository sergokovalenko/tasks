﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Models
{
    public class UserPictureBllModel
    {
        private IUserLogic userBll;
        private IPictureLogic pictureBll;

        public UserPictureBllModel(IUserLogic userBll, IPictureLogic pictureBll)
        {
            this.userBll = userBll;
            this.pictureBll = pictureBll;
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return userBll.GetAllUsers();
        }

        public Guid AddUser(UserDTO user)
        {
            return userBll.AddUser(user);
        }

        public bool DeleteUser(Guid id)
        {
            return userBll.DeleteUser(id);
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            return userBll.UpdateUser(updatedUser);
        }

        public UserDTO GetUserById(Guid id)
        {
            return userBll.GetUserById(id);
        }

        public (byte[] bytes, string type) GetFileWithUsers()
        {
            return userBll.GetFileWithUsers();
        }

        public ImageDTO GetImageById(Guid id)
        {
            return pictureBll.GetImageById(id);
        }

        public bool Addimage(ImageDTO img)
        {
            return pictureBll.AddImage(img);
        }

        internal bool CreateUser(CreateUserVM user, HttpRequestBase request)
        {
            var newUser = Mapper.Map<UserDTO>(user);

            Guid newUserId = AddUser(newUser);

            if (newUserId != Guid.Empty)
            {
                var uploaded = request.Files["Uploaded"];

                if (uploaded != null)
                {
                    byte[] bytes = new byte[uploaded.ContentLength];
                    uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

                    var img = new ImageDTO()
                    {
                        OwnerId = newUserId,
                        Data = bytes,
                        Type = uploaded.ContentType
                    };

                    Addimage(img);
                }

                return true;
            }

            return false;
        }

        internal bool UpdateUser(EditUserVM user, HttpRequestBase request)
        {
            var updatedUser = Mapper.Map<UserDTO>(user);

            if (UpdateUser(updatedUser))
            {
                var uploaded = request.Files["Uploaded"];

                if (uploaded == null)
                {
                    return false;
                }

                byte[] bytes = new byte[uploaded.ContentLength];
                uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

                var img = new ImageDTO()
                {
                    OwnerId = updatedUser.Id,
                    Data = bytes,
                    Type = uploaded.ContentType
                };

                if (pictureBll.GetImageById(img.OwnerId).OwnerId == Guid.Empty)
                {
                    pictureBll.AddImage(img);
                }
                else
                {
                    pictureBll.UpdateImage(img);
                }

                return true;
            }

            return false;
        }

        internal bool DeleteUserImage(Guid ownerId)
        {
            return pictureBll.DeleteImage(ownerId);
        }
    }
}