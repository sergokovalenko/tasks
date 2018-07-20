using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.BLL.AbstractBLL
{
    public interface IUserLogic
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int id);
        bool DeleteUser(int userId);
        int AddUser(UserDTO user);
        bool UpdateUser(UserDTO updatedUser);
        bool AddAwardToUser(int userId, int awardId);
    }
}
