using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.DAL.AbstractDAL
{
    public interface IAbstractDAL
    {
        IEnumerable<UserDTO> GetAllUsers();
        IEnumerable<AwardDTO> GetAllAwards();
        UserDTO GetUserById(Guid id);
        AwardDTO GetAwardById(Guid id);
        bool DeleteUser(Guid userId);
        bool DeleteAward(Guid awardId);
        bool AddUser(UserDTO user);
        bool AddAward(AwardDTO award);
        bool UpdateUser(UserDTO updatedUser);
        bool UpdateAward(AwardDTO updatedAward);
        bool AddImage(ImageDTO img);
    }
}
