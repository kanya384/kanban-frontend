interface IllustrationInterface {
    image: string
}
export const Illustration = (prop: IllustrationInterface) => {
    return (
        <div className="d-none d-lg-flex col-lg-7 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
                <img
                    src={prop.image}
                    alt="auth-register-cover"
                    className="img-fluid my-5 auth-illustration"
                    data-app-light-img="illustrations/auth-register-illustration-light.png"
                    data-app-dark-img="illustrations/auth-register-illustration-dark.png"
                />

                <img
                    src="/img/bg-shape-image-light.png"
                    alt="auth-register-cover"
                    className="platform-bg"
                    data-app-light-img="illustrations/bg-shape-image-light.png"
                    data-app-dark-img="illustrations/bg-shape-image-dark.png"
                />
            </div>
        </div>
    )
} 