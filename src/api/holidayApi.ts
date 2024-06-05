export const fetchHolidays = async (year: number, month: number) => {
  try {
    const response = await fetch(
      `https://isdayoff.ru/api/getdata?year=${year}&month=${month}&cc=ru`
    );
    const data = await response.text();
    //
    const dayOff = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i] === '1') {
        // Если цифра равна 1, это нерабочий день
        dayOff.push(i);
      }
    }
    return dayOff;
  } catch (error) {
    console.error('УПС, не узнаем когда отдыхать');
  }
};
