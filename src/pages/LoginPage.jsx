export default function LoginPage() {
  return (
    <div className="bg-login-background w-screen h-screen bg-cover">
      <div className="flex flex-col w-5/6 h-screen justify-center items-center mx-auto">
        <img
          src="/images/cta-logo-one.svg"
          alt="cta-logo-one"
          className="w-1/2 mb-4"
        />
        <button className=" bg-blue-600 text-white w-1/2 py-3 rounded-sm font-semibold text-lg mb-4 hover:bg-blue-700 transition-colors">
          지금 가입
        </button>
        <p className="text-slate-300 text-xs mb-4">
          영화에 대한 프리미어 엑세스를 얻으십시오. 디즈니 플러스 가격은 다음
          주부터 1,000원 인상됩니다.
        </p>
        <img
          src="/images/cta-logo-two.png"
          alt="cta-logo-two"
          className="w-1/2"
        />
      </div>
    </div>
  );
}
