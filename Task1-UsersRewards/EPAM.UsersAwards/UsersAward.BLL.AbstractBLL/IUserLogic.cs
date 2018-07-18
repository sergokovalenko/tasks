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
        UserDTO GetUserById(Guid id);
        bool DeleteUser(Guid userId);
        Guid AddUser(UserDTO user);
        bool UpdateUser(UserDTO updatedUser);
        (byte[] bytes, string type) GetFileWithUsers();
    }
}
