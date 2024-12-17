export default function PostChristmasTemplate() {
  return (
    <div>
      <h1>Post-Christmas Template Preview</h1>
      <div style={{ border: '1px solid #ddd', padding: '20px' }}>
        <h2>Happy Holidays! 🎄</h2>
        <p>We hope you had a wonderful Christmas!</p>
        <p>As a special thank you, enjoy exclusive offers for the New Year.</p>

        <p style={{ marginTop: '20px' }}>
          Warm wishes,
          <br />
          <b>RankOrbit Team</b>
        </p>

        {/* Logo */}
        <img src='/images/Rank-Orbit-Logo-png.png' alt='RankOrbit Logo' style={{ width: '150px', marginTop: '10px' }} />

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
            <a href='https://www.instagram.com/rankorbit/' target='_blank' rel='noopener noreferrer'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg'
                alt='Instagram'
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
        <div style={{ marginTop: '20px' }}>
          <h3>Contact Us</h3>
          <p style={{ margin: '5px 0' }}>
            Phone: <a href='tel:+1559202209996'>(559) 20220-9996</a>
          </p>
        </div>
      </div>
    </div>
  )
}
