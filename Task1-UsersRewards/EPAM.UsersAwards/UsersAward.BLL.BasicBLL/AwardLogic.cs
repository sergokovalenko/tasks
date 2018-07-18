using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.BLL.BasicBLL
{
    public class AwardLogic : IAwardLogic
    {
        private IAwardDal dal;

        public AwardLogic(IAwardDal dal)
        {
            this.dal = dal;
        }

        public bool AddAward(AwardDTO award)
        {
            if (award == null || string.IsNullOrWhiteSpace(award.Title) || award.Title.Length > 50)
            {
                return false;
            }
            if (string.IsNullOrWhiteSpace(award.Description))
            {
                award.Description = "";
            }
            award.Id = Guid.NewGuid();

            return dal.AddAward(award);
        }

        public bool DeleteAward(Guid awardId)
        {
            return awardId == Guid.Empty ? false : dal.DeleteAward(awardId);
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            return dal.GetAllAwards().ToArray();
        }

        public AwardDTO GetAwardById(Guid id)
        {
            return dal.GetAwardById(id);
        }

        public IEnumerable<AwardDTO> GetAwardsForUser(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentException(nameof(userId));
            }

            return dal.GetAwardsForUser(userId);
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            if (updatedAward == null || string.IsNullOrWhiteSpace(updatedAward.Title))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(updatedAward.Description))
            {
                updatedAward.Description = "";
            }

            return dal.UpdateAward(updatedAward);
        }
    }
}
