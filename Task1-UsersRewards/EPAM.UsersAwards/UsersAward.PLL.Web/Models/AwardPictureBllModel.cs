using AutoMapper;
using System;
using System.Collections.Generic;
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

        public object GetModelForHomePage(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Mapper.Map<IEnumerable<DisplayAwardVM>>(awardBll.GetAllAwards());
            }

            if (query.Length == 1)
            {
                return Mapper.Map<IEnumerable<DisplayAwardVM>>(awardBll.GetAwardsByFirstLetter(query[0]));
            }

            return Mapper.Map<IEnumerable<DisplayAwardVM>>(awardBll.GetAwardsContains(query));
        }

        public Guid Addimage(ImageDTO img)
        {
            return pictureBll.AddImage(img);
        }

        public DisplayAwardVM GetAward(int id)
        {
            return Mapper.Map<DisplayAwardVM>(awardBll.GetAwardById(id));
        }

        public DisplayAwardVM GetAward(string id)
        {
            int awardId;
            DisplayAwardVM awardModel = null;
            bool isNumber = int.TryParse(id, out awardId);

            if (isNumber)
            {
                awardModel = Mapper.Map<DisplayAwardVM>(awardBll.GetAwardById(awardId));
            }
            else
            {
                id = id.Remove('_', ' ');
                awardModel = Mapper.Map<DisplayAwardVM>(awardBll.GetAwardByName(id));
            }

            return awardModel;
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