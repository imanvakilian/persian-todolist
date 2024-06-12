export enum NotFoundMessage {
    notFound = "موردی یافت نشد",
    user = "کاربری با این مشخصات یافت نشد",
    todo = "فعالیتی با این مشخصات یافت نشد",
}
export enum ConflictMessage {
    user = "کاربر دیگری قبلا با این مشخصات ثبت شده است",
    todo = "شما قبلا این فعالیت را برای انجام ثبت کرده اید",
    conflict = "این مورد قبلا ثبت شده است",
    drug = "شما قبلا این دارو را برای استفاده ثبت کرده اید"
}
export enum PublicMessage {
    internalError = "خطایی در سرور رخ داده است. لطفا مجددا تلاش کنید",
    otpSent = "کد احراز حویت با موفقیت ارسال شد",
    LoggedIn = "شما با موفقیت وارد حساب کاربری خود شدید",
    created = "با موفقیت ایجاد شد",
    ok = "با موفقیت انجام شد",
    todoUpdated = "فعالیت با موفقیت بروزرسانی شد",
    todoDeleted = "فعالیت با موفقیت حذف شد",
    active = "با موفقیت فعال شد",
    diActive = "با موفقیت غیر فعال شد",
    error = "عملیات با خطا مواجه شد",
    deleted = "با موفقیت حذف شد",
}
export enum BadRequestMessage {
    otpTiming = "کد ارسال شده هنوز انقضا نشده است",
    todoHasDone = "قبلا این فعالیت را انجام داده اید",
    hasDone = "قبلا این مورد را انجام داده اید",

}
export enum UnauthorizedMessage {
    otpExpired = "کد احراز حویت منقضی شده است",
    invalidOtp = "کد احراز حویت منقضی یا اشتباه میباشد ",
    loginAgain = "لطفا وارد حساب کاربری خود شوید",
}

export enum forbiddenMessage {
    maximumCreateTodo = "در روز بیشتر از 15 فعالیت نمی شود ثبت کرد",
}