 ;
import  { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modal';
import Register from '../register-modal/Register';
import PhoneNumberInput from '../phone-number-input/Input';
import Button from '../button/Button';
import { registerStyles } from '../register-modal/register.styles';
import Password from './_components/Password';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const { setContent, setTitle, setBottom } = useModalStore();
  const [countryCode, setCountryCode] = useState<string | null>('+90');

  useEffect(() => {
    setBottom(
      <div className={registerStyles.bottomText}>
        Hala kayıt olmadın mı?{' '}
        <span
          onClick={() => {
            setContent(<Register />);
          }}
          className={registerStyles.actionLink}>
          Kayıt ol
        </span>
      </div>,
    );
    setTitle('Giriş yap veya kayıt ol');
  }, [setBottom, setTitle, setContent]);

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required('Lütfen telefon numaranı gir.')
      .matches(/^[0-9]{10}$/, 'Geçerli bir telefon numarası girin.'),
  });

  const handleLogin = (values: FormikValues): void => {
    const phone: string = `${countryCode}${values.phone}`;
    setContent(<Password loginPhoneNumber={phone} />);
  };

  return (
    <Formik
      initialValues={{ phone: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      validateOnBlur={true}
      validateOnChange={true}>
      {({ values, handleChange, handleBlur, errors, touched, submitForm }) => (
        <div className="flex flex-col gap-2">
          <PhoneNumberInput
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            setCountryCode={code => setCountryCode(code as string)}
            value={values.phone}
            className="w-full"
            errorText={touched.phone && errors.phone ? errors.phone : ''}
          />
          <Button
            color="secondary"
            onClick={submitForm}
            text="Telefon numarası ile devam et"
          />
          <small className="mt-4 text-grayMid">
            Kişisel verilerine dair Aydınlatma Metni için{' '}
            <span className={registerStyles.link}>tıklayınız</span> .
          </small>
        </div>
      )}
    </Formik>
  );
};

export default Login;
