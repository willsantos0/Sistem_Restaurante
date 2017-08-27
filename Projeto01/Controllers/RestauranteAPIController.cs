using Newtonsoft.Json;
using Projeto01.DBContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Projeto01.Controllers
{
    public class RestauranteAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(modelo.restaurante.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]restaurante res)
        {
           
            modelo.restaurante.Add(res);
          return ToJson(modelo.SaveChanges());
        }

        public HttpResponseMessage Put(long id, [FromBody]restaurante res)
        {
            modelo.Entry(res).State = EntityState.Modified;
            return ToJson(modelo.SaveChanges());
        }
        public HttpResponseMessage Delete(long id)
        {
            modelo.restaurante.Remove(modelo.restaurante.FirstOrDefault(x => x.id == id));
            return ToJson(modelo.SaveChanges());
        }
    }
}