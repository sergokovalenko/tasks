using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;

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

        public bool AddUser(UserDTO user)
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
    }
}