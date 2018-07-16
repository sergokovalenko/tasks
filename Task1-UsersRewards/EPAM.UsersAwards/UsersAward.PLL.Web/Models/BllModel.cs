using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models
{
    public class BllModel
    {
        private IAbstractBLL bll;

        public BllModel(IAbstractBLL bll)
        {
            this.bll = bll;
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return bll.GetAllUsers();
        }

        public bool AddUser(UserDTO user)
        {
            return bll.AddUser(user);
        }

        public bool DeleteUser(Guid id)
        {
            return bll.DeleteUser(id);
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            return bll.UpdateUser(updatedUser);
        }

        public UserDTO GetUserById(Guid id)
        {
            return bll.GetUserById(id);
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            return bll.GetAllAwards();
        }

        public bool AddAward(AwardDTO user)
        {
            return bll.AddAward(user);
        }

        public bool DeleteAward(Guid id)
        {
            return bll.DeleteAward(id);
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            return bll.UpdateAward(updatedAward);
        }

        public AwardDTO GetAwardById(Guid id)
        {
            return bll.GetAwardById(id);
        }

        public (byte[] bytes, string type) GetFileWithUsers()
        {
            return bll.GetFileWithUsers();
        }
    }
}