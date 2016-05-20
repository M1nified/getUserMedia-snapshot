using System;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;

namespace WebApplication1.getUserMedia_snapshot
{
	public partial class WebForm1 : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			string a = Request["pic"];
			if (a != null && a != "")
			{
				var binData = Base64ToImage(a);
				StoreImage(binData);
			}
		}
		public byte[] Base64ToImage(string base64String)
		{
			string base64Data = Regex.Match(base64String, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
			int mod = base64Data.Length % 4;
			if (mod > 0)
				base64Data += new string('=', 4 - (mod));
			base64Data = base64Data.Replace(" ", "+");
			Debug.WriteLine(base64Data.Length);
			var binData = Convert.FromBase64String(base64Data);
			return binData;
		}
		public void StoreImage(byte[] binData)
		{
			string path = Environment.GetFolderPath(Environment.SpecialFolder.MyPictures);
			string filename = "foto" + DateTime.Now.Ticks.ToString() + ".png";
			filename = Path.Combine(path, filename);
			File.WriteAllBytes(filename, binData);
		}
	}
}