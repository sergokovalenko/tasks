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
        UserDTO GetUserById(Guid id);
        bool DeleteUser(Guid userId);
        bool AddUser(UserDTO user);
        bool UpdateUser(UserDTO updatedUser);
        bool AddAwardToUser(Guid userId, Guid awardId);
    }
}
