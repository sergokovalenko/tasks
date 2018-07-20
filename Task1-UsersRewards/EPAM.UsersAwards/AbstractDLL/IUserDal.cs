using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.DAL.AbstractDAL
{
    public interface IUserDal
    {
        IEnumerable<UserDTO> GetAllUsers();
        UserDTO GetUserById(int id);
        bool DeleteUser(int userId);
        int AddUser(UserDTO user);
        bool UpdateUser(UserDTO updatedUser);
        bool AddAwardToUser(int userId, int awardId);
    }
}
