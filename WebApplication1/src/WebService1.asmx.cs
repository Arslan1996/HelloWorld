using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Services;
using Newtonsoft.Json;
using TCMeats_2._0.Classes;
using System.Collections;
using System.Web.Script.Serialization;
using System.Collections.Generic;

namespace TCMeats_2._0.TCMeats_2._0
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod (EnableSession =true)]
        public string Register(User user)
        {
            string msg = null;
            try
            {
                if (!user.userExist())
                {
                    if (user.Register())
                    {
                        Session["user"] = user.Username;
                        msg = "OK";
                    }
                    else
                    {
                        msg = "Unknown Error";
                    }
                }
                else
                {
                    msg = "User Already Exists";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }
        [WebMethod(EnableSession = true)]
        public string Login(User user)
        {
            string msg = null;
            try
            {
                if (user.userExist())
                {
                    if (user.Login())
                    {
                        Session["user"] = user.Username;
                        return JsonConvert.SerializeObject(user);
                    }
                    else
                    {
                        msg = "Invalid Password";
                    }
                }
                else
                {
                    msg = "Invalid Username";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return JsonConvert.SerializeObject(msg);
        }

        [WebMethod]
        public string UpdateProfile(User user)
        {
            string msg = null;
            try
            {
                if (user.userExist())
                {
                    if (user.Update())
                    {
                        return JsonConvert.SerializeObject(user);
                    }
                    else
                    {
                        msg = "UNKNOWN ERROR";
                    }
                }
                else
                {
                    msg = "UNKNOWN ERROR";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return JsonConvert.SerializeObject(msg);
        }

        [WebMethod]
        public string getUsers()
        {
            return JsonConvert.SerializeObject(new User().getUsers());
        }


        [WebMethod]
        public string addProduct(Product product)
        {
            string msg = null;
            try
            {
                if (!product.productExist())
                {
                    if (product.Add())
                    {
                        msg = "OK";
                    }
                    else
                    {
                        msg = "Unknown Error";
                    }
                }
                else
                {
                    msg = "Product Code Already Used";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;

            //Context.Response.Clear();
            //Context.Response.ContentType = "application/text";
            //Context.Response.Write(new JavaScriptSerializer().Serialize(msg));
        }

        [WebMethod]
        public string updateProduct(Product product)
        {
            string msg = null;
            try
            {
                if (product.productExist())
                {
                    if (product.Update())
                    {
                        msg = "OK";
                    }
                    else
                    {
                        msg = "Unknown Error";
                    }
                }
                else
                {
                    msg = "Product Code Already Used";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;

            //Context.Response.Clear();
            //Context.Response.ContentType = "application/text";
            //Context.Response.Write(new JavaScriptSerializer().Serialize(msg));
        }

        [WebMethod]
        public string deleteProduct(Product product)
        {
            string msg = null;
            try
            {
                if (product.productExist())
                {
                    if (product.Delete())
                    {
                        msg = "OK";
                    }
                    else
                    {
                        msg = "Unknown Error";
                    }
                }
                else
                {
                    msg = "Product Code Already Used";
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;

            //Context.Response.Clear();
            //Context.Response.ContentType = "application/text";
            //Context.Response.Write(new JavaScriptSerializer().Serialize(msg));
        }

        [WebMethod]
        public string getProducts()
        {
            ArrayList productList = null;
           // try
            {
                Product P = new Product();
                productList = P.getProducts();
            }
       //     catch (Exception ex)
            {
         //       throw ex;
            }
            //    Context.Response.Clear();
            //    Context.Response.ContentType = "application/json";
            //    Context.Response.Write(new JavaScriptSerializer().Serialize(usersArrayList.ToArray()));
            //
            return JsonConvert.SerializeObject(productList);
        }

        public Order getOrderObject(Order order, string orderInfo)
        {
            try
            {
                List<OrderInfo> info = new List<OrderInfo>();
                var strJsonSer = new JavaScriptSerializer();
                var result = strJsonSer.DeserializeObject(orderInfo) as object[];
                foreach (Dictionary<string, object> product in result)
                {
                    order.TotalItems++;
                    var p = new OrderInfo
                    {
                        productCode = product["Code"].ToString(),
                        productName = product["Name"].ToString(),
                        productDescription = product["Description"].ToString(),
                        productPrice = Convert.ToDouble(product["Price"]),
                        productQunatity = Convert.ToDouble(product["Quantity"]),
                        totalAmount = Convert.ToDouble(product["Line Total"])
                    };
                    info.Add(p);
                }
                order.OrderInfo = info.ToArray();
                return order;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        [WebMethod(EnableSession = true)]
        public string submitOrder(Order order, string orderInfo)
        {
            try
            {
                //order.OrderUser = Session["User"].ToString();
                order = getOrderObject(order, orderInfo);
                if (order.Add())
                    return "OK";
                else
                    return "Error";
            }
            catch(Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        [WebMethod]
        public string getOrders()
        {
            return JsonConvert.SerializeObject(new Order().getOrders());
        }

        [WebMethod]
        public string getOrderInfo(string order)
        {
            return JsonConvert.SerializeObject(new Order().getOrdersInfo(order));
        }

        [WebMethod]
        public string updateOrder(Order order)
        {
            return JsonConvert.SerializeObject(order.Update());
        }
    }
}
