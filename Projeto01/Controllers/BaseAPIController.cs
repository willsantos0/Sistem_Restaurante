using Newtonsoft.Json;
using Projeto01.DBContext;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace Projeto01.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected readonly Model1 modelo = new Model1();

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj, new JsonSerializerSettings()), Encoding.UTF8, "application/json");
            return response;
        }

        protected HttpResponseMessage ErrorJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.Unauthorized);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }


    }
    }