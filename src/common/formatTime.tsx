export const FormatTime =(time:number) => {
  const currentTime = Date.now();
  const hieu = currentTime - time;
  const sogiay = Math.trunc(hieu/1000);
  if(sogiay < 60){
    return 'Vừa xong';
  }
  if(sogiay < 3600){
    return `${Math.trunc(sogiay/60)} phút`
  }
  if(sogiay < 86400){
    return `${Math.trunc(sogiay/3600)} giờ`
  }
  if(sogiay < 86400){
    return `${Math.trunc(sogiay/86400)} ngày`
  }

}