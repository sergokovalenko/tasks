using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models
{
    public class AwardPictureBllModel
    {
        private IAwardLogic awardBll;
        private IPictureLogic pictureBll;

        public AwardPictureBllModel(IAwardLogic awardBll, IPictureLogic pictureBll)
        {
            this.awardBll = awardBll;
            this.pictureBll = pictureBll;
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            return awardBll.GetAllAwards();
        }

        public bool Addimage(ImageDTO img)
        {
            return pictureBll.AddImage(img);
        }

        public bool AddAward(AwardDTO user)
        {
            return awardBll.AddAward(user);
        }

        public bool DeleteAward(Guid id)
        {
            return awardBll.DeleteAward(id);
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            return awardBll.UpdateAward(updatedAward);
        }

        public AwardDTO GetAwardById(Guid id)
        {
            return awardBll.GetAwardById(id);
        }

        public ImageDTO GetImageById(Guid id)
        {
            return pictureBll.GetImageById(id);
        }
    }
}