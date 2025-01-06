export default function christmasTemplate({ salutation }: { salutation: string }) {
  return (
    <div>
      <div style={{ border: '1px solid #ddd', padding: '20px' }}>
        <p>{salutation}</p>
        <h2>Season’s Greetings from Rank Orbit!</h2>
        <p>
          With the festivities approaching, all of us at Rank Orbit would like to express our heartfelt gratitude for
          your trust and collaboration. It’s been a pleasure working with you this year.
        </p>
        <p>
          May this Christmas bring joy, peace, and cherished moments to you and your loved ones. We look forward to
          continuing our partnership in the New Year.
        </p>
        <p>May the magic of Christmas brighten our continued collaboration!</p>
        <p style={{ marginTop: '20px' }}>
          Warmest wishes,
          <br />
          <b>RankOrbit Team</b>
        </p>

        {/* Logo */}
        <a href='https://rankorbit.com/' target='_blank' rel='noopener noreferrer'>
          <img
            src='https://rankorbit.com/wp-content/uploads/2022/12/Christmas-@4x-1536x618.png'
            alt='RankOrbit Logo'
            style={{ width: '100%', height: 'auto', marginTop: '10px' }}
          />
        </a>

        {/* Social Media Links */}
        <div style={{ marginTop: '20px' }}>
          <h3>Follow Us On:</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href='https://www.facebook.com/rankorbit/' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png'
                alt='Facebook'
                style={{ width: '30px', height: '30px' }}
              />
            </a>
            {/* <a href='https://www.instagram.com/rankorbit/' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg'
                alt='Instagram'
                style={{ width: '30px', height: '30px' }}
              />
            </a> */}
            <a href='https://www.linkedin.com/company/rank-orbit/' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
                alt='LinkedIn'
                style={{ width: '30px', height: '30px' }}
              />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        {/* <div style={{ marginTop: '20px' }}>
          <h3>Contact Us</h3>
          <p style={{ margin: '5px 0' }}>
            Phone: <a href='tel:+1559202209996'>(559) 20220-9996</a>
          </p>
        </div> */}
      </div>
    </div>
  )
}
