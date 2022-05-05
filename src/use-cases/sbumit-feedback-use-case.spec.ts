import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create:  createFeedbackSpy },
  { sendMail: sendMailSpy }
)


describe('Submit feedback', () => {

  it('should be able to submit a feedback', async () => {
    
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "An example of comment",
      screenshot: 'data:image/png;base64:ksdlLKDSkdfjDFSKJSDKJgjdfkslgjfsdksdf'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback whithout type', async () => {
    
    await expect(submitFeedback.execute({
      type: "",
      comment: "An example of comment",
      screenshot: 'data:image/png;base64:ksdlLKDSkdfjDFSKJSDKJgjdfkslgjfsdksdf'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback whithout comment', async () => {
    
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: 'data:image/png;base64:ksdlLKDSkdfjDFSKJSDKJgjdfkslgjfsdksdf'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback whith a not base64 image', async () => {
    
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "sdfkfgjhklfg",
      screenshot: 'ksdlLKDSkdfjDFSKJSDKJgjdfkslgjfsdksdf.svg'
    })).rejects.toThrow()
  })

})