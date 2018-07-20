using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.DAL.AbstractDAL
{
    public interface IAwardDal
    {
        IEnumerable<AwardDTO> GetAllAwards();
        AwardDTO GetAwardById(int id);
        bool DeleteAward(int awardId);
        int AddAward(AwardDTO award);
        bool UpdateAward(AwardDTO updatedAward);
        IEnumerable<AwardDTO> GetAwardsForUser(int userId);
        IEnumerable<AwardDTO> GetFreeAwardsForUser(int userId);
    }
}
