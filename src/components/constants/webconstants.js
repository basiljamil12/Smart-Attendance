//const BASE_URL = "http://ec2-13-210-17-40.ap-southeast-2.compute.amazonaws.com/api/v1/";
//const BASE_URL = "https://3.106.228.196/api/v1/";
//const BASE_URL = "https://13.211.10.201/api/v1/";
//const BASE_URL = "http://3.24.90.211/api/v1/";
const BASE_URL = "https://api.cluebycandlelight.com/api/v1/";

const WebApiConstants = {
  get_all_competitions: `${BASE_URL}website/get-all-competitions`,
  get_recent_two_competitions: `${BASE_URL}website/get-recent-two-competitions`,
   ADD_User: `${BASE_URL}website/add-user`,
   VerifyMail:`${BASE_URL}website/verify-email?email=`,
 CHANGE_USERNAME: `${BASE_URL}website/change-username`,
  RESET_PASS_1: `${BASE_URL}website/reset-password-step-1`,
 RESET_PASS_2: `${BASE_URL}website/reset-password-step-2?email=`,
 RESET_PASS_3: `${BASE_URL}website/reset-password-step-3?email=`,
 get_competition_by_id: `${BASE_URL}website/get-competition-by-id?book_id=`,
 public_get_book_by_id: `${BASE_URL}website/public-get-book-by-id?book_id=`,
 create_edit_notes: `${BASE_URL}website/create-edit-notes?book_id=`,
create_sales: `${BASE_URL}website/create-sales`,
create_entry: `${BASE_URL}website/create-entry`,
signin: `${BASE_URL}website/signin`,
sign_out: `${BASE_URL}website/sign-out`,
fresh_user_object: `${BASE_URL}website/fresh-user-object`,
create_entry: `${BASE_URL}website/create-entry`,
contributions: `${BASE_URL}website/contributions`,
contribution_by_id: `${BASE_URL}website/contribution-by-id?book_id=`,
entry_status: `${BASE_URL}website/entry-status?book_id=`,
get_config_payment: `${BASE_URL}website/sales/config-payment?book_id=`,
create_payment: `${BASE_URL}website/sales/create-payment`,
create_sales: `${BASE_URL}website/create-sales`,
footer: `${BASE_URL}website/footer`,
check_promo: `${BASE_URL}website/check-promocode?competitionid=`,
ADD_SUBS: `${BASE_URL}website/add-public-subscriber?email=`,
ADD_SUBSCRIPTION: `${BASE_URL}website/add-subscription`,
DELETE_SUBSCRIPTION: `${BASE_URL}website/delete-subscription`,
check_promo: `${BASE_URL}website/check-promocode?competitionid=`,
export_contribution_by_bookid: `${BASE_URL}website/export-contributions-by-book-id?book_id=`,
get_sales_by_bookid: `${BASE_URL}website/get-sales-by-bookid?book_id=`,
entries_by_bookid: `${BASE_URL}website/list-entry-by-bookid?book_id=`,
export_entries_by_bookid: `${BASE_URL}website/export-list-entry-by-bookid?book_id=`,
};

export default WebApiConstants;