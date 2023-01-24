import Link from "next/link";
import imgF from "../../assets/image/svg/icon-fire-rounded.svg";
import iconL from "../../assets/image/svg/icon-loaction-pin-black.svg";
import iconS from "../../assets/image/svg/icon-suitecase.svg";
import iconC from "../../assets/image/svg/icon-clock.svg";
import { Avatar } from "@material-ui/core";

export default function SearchList(props) {
  const toDate = (d) => {
    console.log(d);
    const date = new Date(parseInt(d));
    console.log({ date });
    const today = new Date();
    var Difference_In_Time = today.getTime() - date.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
    console.log({ Difference_In_Days });
    if (Difference_In_Days < 1) return "Today";
    else if (Difference_In_Days === 1) return Difference_In_Days + " Day ago";
    else return Difference_In_Days + " Days ago";
  };
  const u = props.u;
  return (
    <div className="mb-8">
      <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 ">
        <div className="row">
          <div className="col-md-6">
            <div className="media align-items-center">
              <div className="mr-8">
                {u?.user?.profileImage ? (
                  <img src={u.user.profileImage} alt="Profile image" />
                ) : (
                  <Avatar>{u?.user?.firstName[0]?.toUpperCase()}</Avatar>
                )}
              </div>
              <div>
                <h3 className="mb-0">
                  <Link
                    href={{
                      pathname: "/candidate-profile",
                      query: { profile: u.id },
                    }}
                  >
                    <a className="font-size-6 heading-default-color">
                      {u.fields[0]?.name}{" "}
                    </a>
                  </Link>
                </h3>
                <Link href="/#">
                  <a className="font-size-3 text-default-color line-height-2">
                    {u.user.lastName}&nbsp;{u.user.firstName}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-right pt-7 pt-md-5">
            <div className="media justify-content-md-end">
              <div className="image mr-5 mt-2">
                <img src={imgF} alt="Price" />
              </div>
              <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                <span className="text-black-2">{u.hourRate}</span> $
              </p>
            </div>
          </div>
        </div>
        <div className="row pt-8">
          <div className="col-md-7">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap">
              {u?.skills.map((s, j) => (
                <li>
                  <Link href="/#">
                    <a className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2">
                      {s.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-5">
            <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
              {u?.preferences[0]?.countries.map((s, j) =>
                j < 3 ? (
                  <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                    <span
                      className="mr-4"
                      css={`
                        margin-top: -2px;
                      `}
                    >
                      <img src={iconL} alt="" />
                    </span>
                    <span className="font-weight-semibold">{s.name}</span>
                  </li>
                ) : (
                  <span></span>
                )
              )}{" "}
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span
                  className="mr-4"
                  css={`
                    margin-top: -2px;
                  `}
                >
                  <img src={iconS} alt="" />
                </span>
                <span className="font-weight-semibold">
                  {u.preferences[0]?.name}
                </span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span
                  className="mr-4"
                  css={`
                    margin-top: -2px;
                  `}
                >
                  <img src={iconC} alt="" />
                </span>
                <span className="font-weight-semibold">
                  {toDate(u.preferences[0]?.updatedAt)}
                </span>
              </li>
              <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                <span
                  className="mr-4"
                  css={`
                    margin-top: -2px;
                  `}
                >
                  <img src={iconS} alt="" />
                </span>
                <span className="font-weight-semibold">
                  {u?.years} years of experience
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
