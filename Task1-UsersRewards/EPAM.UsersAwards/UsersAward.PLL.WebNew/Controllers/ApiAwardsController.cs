using System.Linq;
using System.Web.Http;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.AwardModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class ApiAwardsController : ApiController
    {
        private AwardPictureBllModel bllModel;

        public ApiAwardsController(AwardPictureBllModel model)
        {
            this.bllModel = model;
        }

        [Route("api/awards/")]
        [Route("api/awards/{query}")]
        public IHttpActionResult Get(string query)
        {
            var model = bllModel.GetModelForHomePage(query);

            if (model == null)
            {
                return Json(model);
            }

            return Json(model.ToArray());
        }

        [Route("api/award/{id}")]
        public IHttpActionResult GetAward(string id)
        {
            var awardModel = bllModel.GetAward(id);

            if (awardModel == null)
            {
                return NotFound();
            }

            return Json(awardModel);
        }

        [Route("api/award/{id}/delete")]
        public IHttpActionResult Delete(int id)
        {
            if (bllModel.DeleteAward(id))
            {
                return Ok();
            }

            return NotFound();
        }

        [Route("api/award/{id}/edit")]
        [HttpPut]
        public IHttpActionResult EditAward(int id, [FromBody]EditAwardVM updatedAward)
        {
            var award = bllModel.GetAwardById(id);
            if (award == null)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if (!string.IsNullOrWhiteSpace(updatedAward.Title))
                {
                    award.Title = updatedAward.Title;
                }

                if (!string.IsNullOrWhiteSpace(updatedAward.Title))
                {
                    updatedAward.Description = updatedAward.Description;
                }

                if (bllModel.UpdateAward(award))
                {
                    return Ok();
                }
            }

            return BadRequest("We can't edit award with this parametrs");
        }
    }
}