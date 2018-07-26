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
    public class PictureLogic : IPictureLogic
    {
        private IPictureDal dal;

        public PictureLogic(IPictureDal dal)
        {
            this.dal = dal;
        }

        public Guid AddImage(ImageDTO img)
        {
            if (img == null)
            {
                return Guid.Empty;
            }
            if (img.OwnerId == Guid.Empty)
            {
                return Guid.Empty;
            }
            if (string.IsNullOrWhiteSpace(img.Type))
            {
                return Guid.Empty;
            }

            img.OwnerId = Guid.NewGuid();

            if (dal.AddImage(img))
            {
                return img.OwnerId;
            }

            return Guid.Empty;
        }

        public bool DeleteImage(Guid OwnerId)
        {
            if (OwnerId == Guid.Empty)
            {
                return false;
            }

            return dal.DeleteImage(OwnerId);
        }

        public ImageDTO GetImageById(Guid id)
        {
            ImageDTO img = dal.GetImageById(id);

            if (img == null)
            {
                return dal.GetImageById(Guid.Empty);
            }

            return img;
        }

        public bool UpdateImage(ImageDTO img)
        {
            if (img == null)
            {
                return false;
            }
            if (img.OwnerId == Guid.Empty)
            {
                return false;
            }
            if (string.IsNullOrWhiteSpace(img.Type))
            {
                return false;
            }

            return dal.UpdateImage(img);
        }
    }
}
