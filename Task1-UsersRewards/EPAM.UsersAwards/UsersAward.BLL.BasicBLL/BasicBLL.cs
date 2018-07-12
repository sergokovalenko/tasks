using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class BasicBLL : IAbstractBLL
    {
        public BasicBLL()
        {

        }

        public bool AddAward(AwardDTO award)
        {
            throw new NotImplementedException();
        }

        public bool AddUser(UserDTO user)
        {
            throw new NotImplementedException();
        }

        public bool DeleteAward(int awardId)
        {
            throw new NotImplementedException();
        }

        public bool DeleteUser(int userId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            throw new NotImplementedException();
        }

        public bool UpdateUser(UserDTO updatedUser)
        {
            throw new NotImplementedException();
        }
    }
}
