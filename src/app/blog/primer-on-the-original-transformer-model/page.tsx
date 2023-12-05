'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto bg-black text-white min-h-screen">

      <header className="bg-black border border-white flex justify-between w-full p-4 mt-16 mb-16">
        <Link className={`hover:text-emerald-400 ${pathname === `/blog` ? `text-emerald-400` : ``}`} href="/blog">Blog</Link>
        <Link className="hover:text-emerald-400" href="/">Enrique Goudet</Link>
        <Link className="hover:text-emerald-400" href="/about">About</Link>
      </header>

      <section className="bg-black border border-white flex flex-col w-full p-4 mb-16">
        <div className="text-xl font-medium">A primer on the original Transformer model</div>
        <div className="text-slate-300 mt-2">Understanding the transformer architecture proposed in the seminal paper <Link className="text-emerald-400 hover:text-emerald-300" href={"https://arxiv.org/pdf/1706.03762.pdf"}>“Attention is all you need”</Link>.</div>


        <div className="text-slate-200 mt-12">
          After putting it off for some time, I decided to finally sit down and dig into the technical underpinnings of Large Language Models (e.g. ChatGPT). Mostly for myself, but if someone else finds it useful then what the hell.
        </div>
        <div className="text-slate-200 mt-3">
          I set off with the following guiding questions:
          <ul className="ml-5" style={{ listStyleType: 'disc' }}>
            <li>What was the historical context when this groundbreaking paper emerged?</li>
            <li>What was the goal of the paper?</li>
            <li>What is the transformer architecture?</li>
            <li>What does the training process look like?</li>
            <li>What does the inference process look like?</li>
          </ul>
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Historical context
        </div>
        <div className="text-slate-200 mt-3">
          The transformer architecture was designed by researchers at Google to address the biggest limitation in the dominant translation models of the time.
        </div>
        <div className="text-slate-200 mt-3">
          Recurrent Neural Networks and their variants were designed to process sequential data by maintaining a form of memory over the elements they had already processed. However, they had a significant limitation: their inherently sequential nature. This constraint meant that each step in a sequence needed to be processed one after another, which limited the ability to parallelize operations.
        </div>
        <div className="text-slate-200 mt-3">
          This sequential processing not only led to longer training times but also made it challenging to capture long-range dependencies in longer sequences, a crucial aspect in tasks like translation.
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Goal of paper
        </div>
        <div className="text-slate-200 mt-3">
          The objective was to outperform existing RNN models in language translation by introducing a highly parallelizable model. The Transformer achieves this with &quot;self-attention&quot; processing input sequences in their entirety at once, thereby expediting training and enabling scalability for complex, larger datasets. This architecture, tested using the WMT 2014 English-to-German and English-to-French benchmark datasets, marked a shift from sequential to simultaneous data processing in language models.
        </div>

        <div className="text-slate-200 mt-8 text-lg font-medium">
          Transformer Architecture
        </div>

        <div className="text-slate-200 mt-3">
          <Image src="/transformer-architecture.png" alt="architecture" width={1000} height={500} />
        </div>

        <div className="text-slate-200 mt-5">
          <div className="text-lg font-medium">
            Produce input embeddings for Encoder Stack
          </div>
          <div className="text-slate-200 mt-3">
            <ol className="list-decimal ml-5">
              <li>
                <b>Input Embedding</b>
                <ul className="list-disc ml-5">
                  <li><b>Tokenization</b>: The input sequence is tokenized into discrete elements (e.g., words, subwords, or characters).</li>
                  <li><b>Embedding</b>: Each token is mapped to a high-dimensional vector using the embedding matrix. This matrix is part of the model&apos;s trainable parameters.</li>
                </ul>
              </li>
              <li>
                <b>Positional Encoding</b>
                <ul className="list-disc ml-5">
                  <li><b>Encoding</b>: Positional encodings are added to the embedded tokens to retain the order information of the sequence since the self-attention mechanism does not have any inherent notion of sequence position.</li>
                  <li><b>Combination</b>: The positional encodings are combined with the token embeddings to produce position-aware embeddings.</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="text-lg font-medium mt-3">
            Encoder Processing
          </div>
          <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Self-Attention (multi head attention)</b>: Each encoder layer computes self-attention for the input tokens. The self-attention mechanism allows each token to interact with every other token in the sequence (relate each token to each other), weighted by the learned attention scores.</li>
              <li><b>Feed-Forward Network</b>: The output of the self-attention layer is processed through a feed-forward neural network within each encoder layer.</li>
              <li><b>Residual Connections and Normalization</b>: Each sub-layer (self-attention and feed-forward) in the encoder includes a residual connection followed by layer normalization. These steps are critical for stabilizing the training of deep networks.</li>
            </ul>
          </div>
          <div className="text-lg font-medium mt-3">
            Decoder Processing
          </div>
          <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Target Embedding</b>: The target sequence (shifted right to predict the next token) is also tokenized, embedded, and added to positional encodings.</li>
              <li><b>Masked Self-Attention</b>: The decoder&apos;s first sub-layer is a masked self-attention layer, which prevents positions from attending to subsequent positions to ensure predictions are based only on known outputs.</li>
              <li><b>Encoder-Decoder Attention</b>: Each decoder layer also contains an encoder-decoder attention layer that helps the decoder focus on relevant parts of the input sequence. The queries come from the previous decoder layer, and the keys and values come from the output of the encoder.</li>
              <li><b>Feed-Forward Network</b>: The output of the encoder-decoder attention layer is processed through the decoder&apos;s feed-forward neural network.</li>
              <li><b>Residual Connections and Normalization</b>: Similar to the encoder, each sub-layer in the decoder includes a residual connection followed by layer normalization.</li>
            </ul>
          </div>
          <div className="text-lg font-medium mt-3">
            Output Prediction
          </div>
          <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Linear Transformation</b>: The decoder&apos;s output is transformed by a linear layer to match the size of the output vocabulary.</li>
              <li><b>Softmax</b>: A softmax layer converts the logits to probabilities, representing the model&apos;s prediction for the next token in the sequence</li>
            </ul>
          </div>
          <div className="text-lg font-medium mt-3">
            Loss Computation and Backpropagation
          </div>
          <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Loss Computation</b>: The predicted probabilities are compared to the actual target sequence using a loss function, typically cross-entropy loss.</li>
              <li><b>Backpropagation</b>: The gradients of the loss are calculated with respect to all the weights in the model.</li>
              <li><b>Weight Updates</b>: Using an optimizer like Adam, the model&apos;s weights are updated to minimize the loss.</li>
            </ul>
          </div>
          <div className="text-lg font-medium mt-3">
            Iteration
          </div>
          <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Repetition</b>: This process is repeated for many iterations over the dataset, with the model&apos;s predictions and weights being refined each time to improve performance on the training data.</li>
            </ul>
          </div>
        </div>


        <div className="text-lg font-medium mt-8">
            What does the training process look like?
        </div>
        <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Cataloging and Gathering Data</b>: This is the initial stage where relevant data is collected. For language models, this means compiling a large dataset of text that the model will learn from.</li>
              <li><b>Pre-training</b>: During pre-training, the model is exposed to this data and learns to predict parts of the text given other parts. This is where it picks up on language patterns, grammar, and information from the data without any specific task in mind.</li>
              <li><b>Fine-tuning</b>: After pre-training, the model is further trained on a smaller, task-specific dataset. This helps the model adapt its broad language understanding to perform specific tasks like translation, question-answering, or text summarization.</li>
              <li><b>RLHF</b>: Stands for Reinforcement Learning from Human Feedback. This is a more advanced training process where the model is refined based on feedback from human trainers. The model makes predictions, humans provide corrections or approvals, and the model learns from these interactions to align its outputs more closely with human judgments or desired outcomes.</li>
              <li><b>Evals</b>: Conducted using a test dataset, which is a collection of data the model has never seen before. This ensures that the evaluation reflects the model&apos;s ability to generalize to new data, rather than just repeating what it has learned by rote. The model&apos;s output is compared against the expected output using specific metrics. For language models, common metrics include BLEU for translation accuracy, ROUGE for summarization quality, or accuracy and F1 score for classification tasks.</li>
            </ul>
        </div>

        <div className="text-lg font-medium mt-8">
            What does the inference process look like?
        </div>
        <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><b>Input Preparation</b>: Just like during training, the input data (such as a sentence needing translation) is tokenized into discrete elements and converted into numerical representations through embedding.</li>
              <li><b>Positional Encoding</b>: The numerical representations are then combined with positional encodings to maintain the order of the sequence, which is crucial for the model to understand the context and structure of the input data.</li>
              <li><b>Model Prediction</b>: The prepared input is fed into the trained model. The Transformer processes this input through its encoder and decoder structures using attention mechanisms to weigh the importance of different parts of the input data.</li>
              <li><b>Generating Output</b>: The decoder generates the output sequence step-by-step, often using techniques like beam search to improve the quality of the output by considering multiple possible sequences and choosing the one with the highest probability.</li>
              <li><b>Output Processing</b>: The numerical output from the decoder is converted back into a human-readable format, such as the translated text in the target language. This is typically done by mapping the numerical predictions back to words or tokens.</li>
              <li><b>Post-processing</b>: Sometimes, additional steps like correcting grammar, ensuring coherence, or adjusting style are applied to refine the generated output.</li>
            </ul>
        </div>

        <div className="text-lg font-medium mt-8">
            Sources / Resources
        </div>
        <div className="text-slate-200 mt-3">
            <ul className="list-disc ml-5">
              <li><Link href="https://arxiv.org/pdf/1706.03762.pdf" className="text-emerald-400 hover:text-emerald-300">https://arxiv.org/pdf/1706.03762.pdf</Link></li>
              <li><Link href="https://www.youtube.com/watch?v=zjkBMFhNj_g" className="text-emerald-400 hover:text-emerald-300">https://www.youtube.com/watch?v=zjkBMFhNj_g</Link></li>
            </ul>
        </div>

      </section>

      <footer className="bg-black border border-white flex justify-center w-full p-4 space-x-4">
        <a href="https://twitter.com/enrique_goudet" className="hover:text-emerald-400">twitter</a>
        <a href="https://github.com/goudete" className="hover:text-emerald-400">github</a>
        <div className="relative flex items-center">
          <a href="#" className="hover:text-emerald-400" onClick={(e) => {
            e.preventDefault();
            copyToClipboard('goudetenrique@gmail.com');
          }}>
            email
          </a>
          {copySuccess && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 ml-2">
              Copied!
            </div>
          )}
        </div>
      </footer>

    </div>
  );
}
