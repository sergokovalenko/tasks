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
        IEnumerable<UserDTO> GetUsersByFirstLetter(char letter);
        IEnumerable<UserDTO> GetUsersContains(string text);
        UserDTO GetUserById(int id);
        UserDTO GetOldestUserByName(string name);
        bool DeleteUser(int userId);
        int AddUser(UserDTO user);
        bool UpdateUser(UserDTO updatedUser);
        bool AddAwardToUser(int userId, int awardId);
        int CalculateAge(DateTime birthDate);
    }
}
