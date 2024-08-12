export enum RegexEnum {
	Email = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
	PhoneNumber = '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$',
}

export const regexPatterns = {
	[RegexEnum.Email]: new RegExp(RegexEnum.Email),
	[RegexEnum.PhoneNumber]: new RegExp(RegexEnum.PhoneNumber),
};