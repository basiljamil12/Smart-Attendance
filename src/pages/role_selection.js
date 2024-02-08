import Footer from "../components/footer/footer";
import PlainNavbar from "../components/navbars/plainbar";
import Parent from "../assets/images/parent.jpg";
import Student from "../assets/images/student.png";
import Teacher from "../assets/images/teacher.png";

function RoleSelect() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div>
        <PlainNavbar />
      </div>
      <div className="flex flex-col md:flex-row flex-grow justify-center items-center mt-10">
        <div className="w-72 shadow-xl h-96 rounded-3xl mx-10 md:my-0 my-10">
          <div>
            <img src={Teacher} />
          </div>
          <div className="pt-3">
            <button className="bg-sa-maroon rounded-xl w-48 h-12 shadow-md mx-5">
              <span className="text-white font-bold text-xl">
                Go To Faculty
              </span>
            </button>
          </div>
        </div>
        <div className="w-72 shadow-xl h-96 rounded-3xl mx-10 md:my-0 my-10">
          <div>
            <img src={Student} />
          </div>
          <div className="pt-2">
            <button className="bg-sa-maroon rounded-xl w-48 h-12 shadow-md mx-5">
              <span className="text-white font-bold text-xl">
                Go To Student
              </span>
            </button>
          </div>
        </div>
        <div className="w-72 shadow-xl h-96 rounded-3xl mx-10 md:my-0 my-10">
          <div>
            <img src={Parent} />
          </div>
          <div className="pt-5">
            <button className="bg-sa-maroon rounded-xl w-48 h-12 shadow-md mx-5">
              <span className="text-white font-bold text-xl">Go To Parent</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default RoleSelect;
