<script>
  import { base } from '$app/paths';
  import resume from '../lib/FranksResume.pdf';
</script>

<section class="about">
  <div class="custom-container about__card">
    <div class="about__profile">
      <p class="about__name">Frank Fiumara</p>
      <nav class="about__links" aria-label="Primary navigation">
        <a href={resume} target="_blank" rel="noopener noreferrer">
          <i class="fa-regular fa-file fa-beat-fade-hover"></i>
          Resume
        </a>
        <a href="https://github.com/frankfium" target="_blank" rel="noopener noreferrer">
          <i class="fa fa-code-branch fa-bounce-hover"></i>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/frankfium/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-linkedin fa-spin-hover"></i>
          LinkedIn
        </a>
        <a href="mailto:fiumara.frank10@gmail.com?subject=Fill me out!">
          <i class="fa-regular fa-envelope fa-shake-hover"></i>
          Email
        </a>
        <a href={`${base}/admin`} class="isDisabled">
          <i class="fa-solid fa-lock fa-flip-hover"></i>
          Admin
        </a>
      </nav>
    </div>

    <div class="about__divider" aria-hidden="true"></div>

    <div class="about__content">
      <h1>HELLO,</h1>
      <p>
        I am a passionate software developer with a keen eye for innovation and a deep love for coding.
        I specialize in crafting elegant and efficient software solutions that not only meet the needs of
        clients but also push the boundaries of what technology can achieve. With a strong foundation in
        multiple programming languages and a dedication to lifelong learning, I'm committed to staying at the
        forefront of the ever-evolving tech landscape.
      </p>
      <div class="secret">
        <h6>secret</h6>
      </div>
    </div>
  </div>
</section>



