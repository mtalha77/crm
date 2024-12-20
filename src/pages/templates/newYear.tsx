export default function NewYearTemplate({ salutation }: { salutation: string }) {
  return (
    <div>
      <p>{salutation}</p>
      <p>
        As the year comes to a close, we want to take a moment to thank you for trusting Rank Orbit to support your
        goals. Your partnership means the world to us, and it’s been a great privilege to work with you this past year.
      </p>
      <p>
        As we ring in the New Year, we’re wishing you and your loved ones happiness, health, and success. May the coming
        year bring great new opportunities and exciting achievements for you and your business!
      </p>
      <p>Here’s to a fantastic year ahead together!</p>
      <p>
        Best regards, <br />
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
  )
}
