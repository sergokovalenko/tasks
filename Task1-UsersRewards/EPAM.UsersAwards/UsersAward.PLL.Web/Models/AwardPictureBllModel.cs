using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.BLL.AbstractBLL;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models.AwardModels;

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

        public Guid Addimage(ImageDTO img)
        {
            return pictureBll.AddImage(img);
        }

        public bool CreateAward(CreateAwardVM award, HttpRequestBase request)
        {
            Guid imageId = Guid.Empty;
            var newAward = Mapper.Map<AwardDTO>(award);
            var uploaded = request.Files["Uploaded"];

            if (uploaded == null || uploaded.ContentLength == 0)
            {
                return false;
            }

            byte[] bytes = new byte[uploaded.ContentLength];
            uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

            var img = new ImageDTO()
            {
                OwnerId = Guid.NewGuid(),
                Data = bytes,
                Type = uploaded.ContentType
            };

            imageId = Addimage(img);
            newAward.ImageId = imageId;

            int newAwardId = awardBll.AddAward(newAward);

            return newAwardId != 0;
        }

        public bool DeleteAward(int id)
        {
            return awardBll.DeleteAward(id);
        }

        public bool UpdateAward(EditAwardVM award, HttpRequestBase request)
        {
            var updatedAward = Mapper.Map<AwardDTO>(award);
            var uploaded = request.Files["Uploaded"];

            if (uploaded != null && uploaded.ContentLength != 0)
            {
                byte[] bytes = new byte[uploaded.ContentLength];
                uploaded.InputStream.Read(bytes, 0, uploaded.ContentLength);

                var img = new ImageDTO()
                {
                    OwnerId = updatedAward.ImageId,
                    Data = bytes,
                    Type = uploaded.ContentType
                };

                pictureBll.UpdateImage(img);
            }

            return awardBll.UpdateAward(updatedAward);
        }

        public AwardDTO GetAwardById(int id)
        {
            return awardBll.GetAwardById(id);
        }

        public ImageDTO GetImageById(Guid id)
        {
            return pictureBll.GetImageById(id);
        }
    }
}