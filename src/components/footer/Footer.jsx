import './Footer.scss';

export function Footer() {
    return (
        <div className="footer">
              <div className='text-center p-3 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://www.helpguide.org/articles/suicide-prevention/suicide-prevention.htm'>
          VeSaMa.com
        </a>
      </div>
            </div>
    );
}