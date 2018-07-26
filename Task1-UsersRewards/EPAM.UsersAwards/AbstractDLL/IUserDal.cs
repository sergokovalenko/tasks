using System.Collections.Generic;
using UsersAward.Entities;

namespace UsersAward.DAL.AbstractDAL
{
    public interface IUserDal
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

        bool UserHasAward(int userId, int awardId);
    }
}
