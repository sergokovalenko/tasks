using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.BLL.AbstractBLL
{
    public interface IAbstractBLL
    {
        IEnumerable<UserDTO> GetAllUsers();
        IEnumerable<AwardDTO> GetAllAwards();
        bool DeleteUser(int userId);
        bool DeleteAward(int awardId);
        bool AddUser(UserDTO user);
        bool AddAward(AwardDTO award);
        bool UpdateUser(UserDTO updatedUser);
        bool UpdateAward(AwardDTO updatedAward);
    }
}
