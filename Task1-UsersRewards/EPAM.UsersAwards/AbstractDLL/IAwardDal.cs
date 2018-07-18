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
        AwardDTO GetAwardById(Guid id);
        bool DeleteAward(Guid awardId);
        bool AddAward(AwardDTO award);
        bool UpdateAward(AwardDTO updatedAward);
        IEnumerable<AwardDTO> GetAwardsForUser(Guid userId);
    }
}
