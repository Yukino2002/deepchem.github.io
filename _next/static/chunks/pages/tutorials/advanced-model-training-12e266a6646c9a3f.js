(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4713],{2483:function(s,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tutorials/advanced-model-training",function(){return n(368)}])},368:function(s,a,n){"use strict";n.r(a),n.d(a,{default:function(){return d}});var p=n(5893),e=n(2144),l=n(6485),t={html:' <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <h1>\n      Advanced Model Training\n      <a class="anchor-link" href="#Advanced-Model-Training">\n       \xb6\n      </a>\n     </h1>\n     <p>\n      In the tutorials so far we have followed a simple procedure for training models: load a dataset, create a model, call\n      <code>\n       fit()\n      </code>\n      , evaluate it, and call ourselves done.  That\'s fine for an example, but in real machine learning projects the process is usually more complicated.  In this tutorial we will look at a more realistic workflow for training a model.\n     </p>\n     <h2>\n      Colab\n      <a class="anchor-link" href="#Colab">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      This tutorial and the rest in this sequence can be done in Google colab. If you\'d like to open this notebook in colab, you can use the following link.\n     </p>\n     <p>\n      <a href="https://colab.research.google.com/github/deepchem/deepchem/blob/master/examples/tutorials/Advanced_Model_Training.ipynb">\n       <img alt="Open In Colab" src="https://colab.research.google.com/assets/colab-badge.svg"/>\n      </a>\n     </p>\n     <h2>\n      Setup\n      <a class="anchor-link" href="#Setup">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      To run DeepChem within Colab, you\'ll need to run the following installation commands. You can of course run this tutorial locally if you prefer. In that case, don\'t run these cells since they will download and install DeepChem in your local machine again.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[\xa0]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="o">!</span>pip install --pre deepchem\n<span class="kn">import</span> <span class="nn">deepchem</span>\n<span class="n">deepchem</span><span class="o">.</span><span class="n">__version__</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <h2>\n      Hyperparameter Optimization\n      <a class="anchor-link" href="#Hyperparameter-Optimization">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      Let\'s start by loading the HIV dataset.  It classifies over 40,000 molecules based on whether they inhibit HIV replication.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[1]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="kn">import</span> <span class="nn">deepchem</span> <span class="k">as</span> <span class="nn">dc</span>\n\n<span class="n">tasks</span><span class="p">,</span> <span class="n">datasets</span><span class="p">,</span> <span class="n">transformers</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">molnet</span><span class="o">.</span><span class="n">load_hiv</span><span class="p">(</span><span class="n">featurizer</span><span class="o">=</span><span class="s1">\'ECFP\'</span><span class="p">,</span> <span class="n">split</span><span class="o">=</span><span class="s1">\'scaffold\'</span><span class="p">)</span>\n<span class="n">train_dataset</span><span class="p">,</span> <span class="n">valid_dataset</span><span class="p">,</span> <span class="n">test_dataset</span> <span class="o">=</span> <span class="n">datasets</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      Now let\'s train a model on it.  We will use a\n      <code>\n       MultitaskClassifier\n      </code>\n      , which is just a stack of dense layers.  But that still leaves a lot of options.  How many layers should there be, and how wide should each one be?  What dropout rate should we use?  What learning rate?\n     </p>\n     <p>\n      These are called hyperparameters.  The standard way to select them is to try lots of values, train each model on the training set, and evaluate it on the validation set.  This lets us see which ones work best.\n     </p>\n     <p>\n      You could do that by hand, but usually it\'s easier to let the computer do it for you.  DeepChem provides a selection of hyperparameter optimization algorithms, which are found in the\n      <code>\n       dc.hyper\n      </code>\n      package.  For this example we\'ll use\n      <code>\n       GridHyperparamOpt\n      </code>\n      , which is the most basic method.  We just give it a list of options for each hyperparameter and it exhaustively tries all combinations of them.\n     </p>\n     <p>\n      The lists of options are defined by a\n      <code>\n       dict\n      </code>\n      that we provide.  For each of the model\'s arguments, we provide a list of values to try.  In this example we consider three possible sets of hidden layers: a single layer of width 500, a single layer of width 1000, or two layers each of width 1000.  We also consider two dropout rates (20% and 50%) and two learning rates (0.001 and 0.0001).\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[2]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="n">params_dict</span> <span class="o">=</span> <span class="p">{</span>\n    <span class="s1">\'n_tasks\'</span><span class="p">:</span> <span class="p">[</span><span class="nb">len</span><span class="p">(</span><span class="n">tasks</span><span class="p">)],</span>\n    <span class="s1">\'n_features\'</span><span class="p">:</span> <span class="p">[</span><span class="mi">1024</span><span class="p">],</span>\n    <span class="s1">\'layer_sizes\'</span><span class="p">:</span> <span class="p">[[</span><span class="mi">500</span><span class="p">],</span> <span class="p">[</span><span class="mi">1000</span><span class="p">],</span> <span class="p">[</span><span class="mi">1000</span><span class="p">,</span> <span class="mi">1000</span><span class="p">]],</span>\n    <span class="s1">\'dropouts\'</span><span class="p">:</span> <span class="p">[</span><span class="mf">0.2</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">],</span>\n    <span class="s1">\'learning_rate\'</span><span class="p">:</span> <span class="p">[</span><span class="mf">0.001</span><span class="p">,</span> <span class="mf">0.0001</span><span class="p">]</span>\n<span class="p">}</span>\n<span class="n">optimizer</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">hyper</span><span class="o">.</span><span class="n">GridHyperparamOpt</span><span class="p">(</span><span class="n">dc</span><span class="o">.</span><span class="n">models</span><span class="o">.</span><span class="n">MultitaskClassifier</span><span class="p">)</span>\n<span class="n">metric</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">metrics</span><span class="o">.</span><span class="n">Metric</span><span class="p">(</span><span class="n">dc</span><span class="o">.</span><span class="n">metrics</span><span class="o">.</span><span class="n">roc_auc_score</span><span class="p">)</span>\n<span class="n">best_model</span><span class="p">,</span> <span class="n">best_hyperparams</span><span class="p">,</span> <span class="n">all_results</span> <span class="o">=</span> <span class="n">optimizer</span><span class="o">.</span><span class="n">hyperparam_search</span><span class="p">(</span>\n        <span class="n">params_dict</span><span class="p">,</span> <span class="n">train_dataset</span><span class="p">,</span> <span class="n">valid_dataset</span><span class="p">,</span> <span class="n">metric</span><span class="p">,</span> <span class="n">transformers</span><span class="p">)</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      <code>\n       hyperparam_search()\n      </code>\n      returns three arguments: the best model it found, the hyperparameters for that model, and a full listing of the validation score for every model.  Let\'s take a look at the last one.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[3]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="n">all_results</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n  <div class="jp-Cell-outputWrapper">\n   <div class="jp-Collapser jp-OutputCollapser jp-Cell-outputCollapser">\n   </div>\n   <div class="jp-OutputArea jp-Cell-outputArea">\n    <div class="jp-OutputArea-child jp-OutputArea-executeResult">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n      Out[3]:\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output jp-OutputArea-executeResult" data-mime-type="text/plain">\n      <pre class="overflow-x-scroll">{\'_dropouts_0.200000_layer_sizes[500]_learning_rate_0.001000_n_features_1024_n_tasks_1\': 0.759624393738977,\n \'_dropouts_0.200000_layer_sizes[500]_learning_rate_0.000100_n_features_1024_n_tasks_1\': 0.7680791323731138,\n \'_dropouts_0.500000_layer_sizes[500]_learning_rate_0.001000_n_features_1024_n_tasks_1\': 0.7623870149911817,\n \'_dropouts_0.500000_layer_sizes[500]_learning_rate_0.000100_n_features_1024_n_tasks_1\': 0.7552282358416618,\n \'_dropouts_0.200000_layer_sizes[1000]_learning_rate_0.001000_n_features_1024_n_tasks_1\': 0.7689915858318636,\n \'_dropouts_0.200000_layer_sizes[1000]_learning_rate_0.000100_n_features_1024_n_tasks_1\': 0.7619292572996277,\n \'_dropouts_0.500000_layer_sizes[1000]_learning_rate_0.001000_n_features_1024_n_tasks_1\': 0.7641491524593376,\n \'_dropouts_0.500000_layer_sizes[1000]_learning_rate_0.000100_n_features_1024_n_tasks_1\': 0.7609877155594749,\n \'_dropouts_0.200000_layer_sizes[1000, 1000]_learning_rate_0.001000_n_features_1024_n_tasks_1\': 0.770716980207721,\n \'_dropouts_0.200000_layer_sizes[1000, 1000]_learning_rate_0.000100_n_features_1024_n_tasks_1\': 0.7750327625906329,\n \'_dropouts_0.500000_layer_sizes[1000, 1000]_learning_rate_0.001000_n_features_1024_n_tasks_1\': 0.725972314079953,\n \'_dropouts_0.500000_layer_sizes[1000, 1000]_learning_rate_0.000100_n_features_1024_n_tasks_1\': 0.7546280986674505}</pre>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <p>\n      We can see a few general patterns.  Using two layers with the larger learning rate doesn\'t work very well.  It seems the deeper model requires a smaller learning rate.  We also see that 20% dropout usually works better than 50%.  Once we narrow down the list of models based on these observations, all the validation scores are very close to each other, probably close enough that the remaining variation is mainly noise.  It doesn\'t seem to make much difference which of the remaining hyperparameter sets we use, so let\'s arbitrarily pick a single layer of width 1000 and learning rate of 0.0001.\n     </p>\n     <h2>\n      Early Stopping\n      <a class="anchor-link" href="#Early-Stopping">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      There is one other important hyperparameter we haven\'t considered yet: how long we train the model for.\n      <code>\n       GridHyperparamOpt\n      </code>\n      trains each for a fixed, fairly small number of epochs.  That isn\'t necessarily the best number.\n     </p>\n     <p>\n      You might expect that the longer you train, the better your model will get, but that isn\'t usually true.  If you train too long, the model will usually start overfitting to irrelevant details of the training set.  You can tell when this happens because the validation set score stops increasing and may even decrease, while the score on the training set continues to improve.\n     </p>\n     <p>\n      Fortunately, we don\'t need to train lots of different models for different numbers of steps to identify the optimal number.  We just train it once, monitor the validation score, and keep whichever parameters maximize it.  This is called "early stopping".  DeepChem\'s\n      <code>\n       ValidationCallback\n      </code>\n      class can do this for us automatically.  In the example below, we have it compute the validation set\'s ROC AUC every 1000 training steps.  If you add the\n      <code>\n       save_dir\n      </code>\n      argument, it will also save a copy of the best model parameters to disk.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[4]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="n">model</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">models</span><span class="o">.</span><span class="n">MultitaskClassifier</span><span class="p">(</span><span class="n">n_tasks</span><span class="o">=</span><span class="nb">len</span><span class="p">(</span><span class="n">tasks</span><span class="p">),</span>\n                                      <span class="n">n_features</span><span class="o">=</span><span class="mi">1024</span><span class="p">,</span>\n                                      <span class="n">layer_sizes</span><span class="o">=</span><span class="p">[</span><span class="mi">1000</span><span class="p">],</span>\n                                      <span class="n">dropouts</span><span class="o">=</span><span class="mf">0.2</span><span class="p">,</span>\n                                      <span class="n">learning_rate</span><span class="o">=</span><span class="mf">0.0001</span><span class="p">)</span>\n<span class="n">callback</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">models</span><span class="o">.</span><span class="n">ValidationCallback</span><span class="p">(</span><span class="n">valid_dataset</span><span class="p">,</span> <span class="mi">1000</span><span class="p">,</span> <span class="n">metric</span><span class="p">)</span>\n<span class="n">model</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">train_dataset</span><span class="p">,</span> <span class="n">nb_epoch</span><span class="o">=</span><span class="mi">50</span><span class="p">,</span> <span class="n">callbacks</span><span class="o">=</span><span class="n">callback</span><span class="p">)</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n  <div class="jp-Cell-outputWrapper">\n   <div class="jp-Collapser jp-OutputCollapser jp-Cell-outputCollapser">\n   </div>\n   <div class="jp-OutputArea jp-Cell-outputArea">\n    <div class="jp-OutputArea-child">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output" data-mime-type="text/plain">\n      <pre class="overflow-x-scroll">Step 1000 validation: roc_auc_score=0.759757\nStep 2000 validation: roc_auc_score=0.770685\nStep 3000 validation: roc_auc_score=0.771588\nStep 4000 validation: roc_auc_score=0.777862\nStep 5000 validation: roc_auc_score=0.773894\nStep 6000 validation: roc_auc_score=0.763762\nStep 7000 validation: roc_auc_score=0.766361\nStep 8000 validation: roc_auc_score=0.767026\nStep 9000 validation: roc_auc_score=0.761239\nStep 10000 validation: roc_auc_score=0.761279\nStep 11000 validation: roc_auc_score=0.765363\nStep 12000 validation: roc_auc_score=0.769481\nStep 13000 validation: roc_auc_score=0.768523\nStep 14000 validation: roc_auc_score=0.761306\nStep 15000 validation: roc_auc_score=0.77397\nStep 16000 validation: roc_auc_score=0.764848\n</pre>\n     </div>\n    </div>\n    <div class="jp-OutputArea-child jp-OutputArea-executeResult">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n      Out[4]:\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output jp-OutputArea-executeResult" data-mime-type="text/plain">\n      <pre class="overflow-x-scroll">0.8040038299560547</pre>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <h2>\n      Learning Rate Schedules\n      <a class="anchor-link" href="#Learning-Rate-Schedules">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      In the examples above we use a fixed learning rate throughout training.  In some cases it works better to vary the learning rate during training.  To do this in DeepChem, we simply specify a\n      <code>\n       LearningRateSchedule\n      </code>\n      object instead of a number for the\n      <code>\n       learning_rate\n      </code>\n      argument.  In the following example we use a learning rate that decreases exponentially.  It starts at 0.0002, then gets multiplied by 0.9 after every 1000 steps.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[5]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="n">learning_rate</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">models</span><span class="o">.</span><span class="n">optimizers</span><span class="o">.</span><span class="n">ExponentialDecay</span><span class="p">(</span><span class="mf">0.0002</span><span class="p">,</span> <span class="mf">0.9</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>\n<span class="n">model</span> <span class="o">=</span> <span class="n">dc</span><span class="o">.</span><span class="n">models</span><span class="o">.</span><span class="n">MultitaskClassifier</span><span class="p">(</span><span class="n">n_tasks</span><span class="o">=</span><span class="nb">len</span><span class="p">(</span><span class="n">tasks</span><span class="p">),</span>\n                                      <span class="n">n_features</span><span class="o">=</span><span class="mi">1024</span><span class="p">,</span>\n                                      <span class="n">layer_sizes</span><span class="o">=</span><span class="p">[</span><span class="mi">1000</span><span class="p">],</span>\n                                      <span class="n">dropouts</span><span class="o">=</span><span class="mf">0.2</span><span class="p">,</span>\n                                      <span class="n">learning_rate</span><span class="o">=</span><span class="n">learning_rate</span><span class="p">)</span>\n<span class="n">model</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">train_dataset</span><span class="p">,</span> <span class="n">nb_epoch</span><span class="o">=</span><span class="mi">50</span><span class="p">,</span> <span class="n">callbacks</span><span class="o">=</span><span class="n">callback</span><span class="p">)</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n  <div class="jp-Cell-outputWrapper">\n   <div class="jp-Collapser jp-OutputCollapser jp-Cell-outputCollapser">\n   </div>\n   <div class="jp-OutputArea jp-Cell-outputArea">\n    <div class="jp-OutputArea-child">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output" data-mime-type="text/plain">\n      <pre class="overflow-x-scroll">Step 1000 validation: roc_auc_score=0.736547\nStep 2000 validation: roc_auc_score=0.758979\nStep 3000 validation: roc_auc_score=0.768361\nStep 4000 validation: roc_auc_score=0.764898\nStep 5000 validation: roc_auc_score=0.775253\nStep 6000 validation: roc_auc_score=0.779898\nStep 7000 validation: roc_auc_score=0.76991\nStep 8000 validation: roc_auc_score=0.771515\nStep 9000 validation: roc_auc_score=0.773796\nStep 10000 validation: roc_auc_score=0.776977\nStep 11000 validation: roc_auc_score=0.778866\nStep 12000 validation: roc_auc_score=0.777066\nStep 13000 validation: roc_auc_score=0.77616\nStep 14000 validation: roc_auc_score=0.775646\nStep 15000 validation: roc_auc_score=0.772785\nStep 16000 validation: roc_auc_score=0.769975\n</pre>\n     </div>\n    </div>\n    <div class="jp-OutputArea-child jp-OutputArea-executeResult">\n     <div class="jp-OutputPrompt jp-OutputArea-prompt">\n      Out[5]:\n     </div>\n     <div class="jp-RenderedText jp-OutputArea-output jp-OutputArea-executeResult" data-mime-type="text/plain">\n      <pre class="overflow-x-scroll">0.22854619979858398</pre>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <h1>\n      Congratulations! Time to join the Community!\n      <a class="anchor-link" href="#Congratulations!-Time-to-join-the-Community!">\n       \xb6\n      </a>\n     </h1>\n     <p>\n      Congratulations on completing this tutorial notebook! If you enjoyed working through the tutorial, and want to continue working with DeepChem, we encourage you to finish the rest of the tutorials in this series. You can also help the DeepChem community in the following ways:\n     </p>\n     <h2>\n      Star DeepChem on\n      <a href="https://github.com/deepchem/deepchem">\n       GitHub\n      </a>\n      <a class="anchor-link" href="#Star-DeepChem-on-GitHub">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      This helps build awareness of the DeepChem project and the tools for open source drug discovery that we\'re trying to build.\n     </p>\n     <h2>\n      Join the DeepChem Gitter\n      <a class="anchor-link" href="#Join-the-DeepChem-Gitter">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      The DeepChem\n      <a href="https://gitter.im/deepchem/Lobby">\n       Gitter\n      </a>\n      hosts a number of scientists, developers, and enthusiasts interested in deep learning for the life sciences. Join the conversation!\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-MarkdownCell jp-Notebook-cell">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n    </div>\n    <div class="jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput" data-mime-type="text/markdown">\n     <h2>\n      Citing This Tutorial\n      <a class="anchor-link" href="#Citing-This-Tutorial">\n       \xb6\n      </a>\n     </h2>\n     <p>\n      If you found this tutorial useful please consider citing it using the provided BibTeX.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class="jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs">\n  <div class="jp-Cell-inputWrapper">\n   <div class="jp-Collapser jp-InputCollapser jp-Cell-inputCollapser">\n   </div>\n   <div class="jp-InputArea jp-Cell-inputArea">\n    <div class="jp-InputPrompt jp-InputArea-prompt">\n     In\xa0[\xa0]:\n    </div>\n    <div class="jp-CodeMirrorEditor jp-Editor jp-InputArea-editor" data-type="inline">\n     <div class="CodeMirror cm-s-jupyter">\n      <div class="highlight hl-ipython3">\n       <pre class="overflow-x-scroll"><span></span><span class="nd">@manual</span><span class="p">{</span><span class="n">Intro9</span><span class="p">,</span> \n <span class="n">title</span><span class="o">=</span><span class="p">{</span><span class="n">Advanced</span> <span class="n">Model</span> <span class="n">Training</span><span class="p">},</span> \n <span class="n">organization</span><span class="o">=</span><span class="p">{</span><span class="n">DeepChem</span><span class="p">},</span>\n <span class="n">author</span><span class="o">=</span><span class="p">{</span><span class="n">Eastman</span><span class="p">,</span> <span class="n">Peter</span> <span class="ow">and</span> <span class="n">Ramsundar</span><span class="p">,</span> <span class="n">Bharath</span><span class="p">},</span> \n <span class="n">howpublished</span> <span class="o">=</span> <span class="p">{</span>\\<span class="n">url</span><span class="p">{</span><span class="n">https</span><span class="p">:</span><span class="o">//</span><span class="n">github</span><span class="o">.</span><span class="n">com</span><span class="o">/</span><span class="n">deepchem</span><span class="o">/</span><span class="n">deepchem</span><span class="o">/</span><span class="n">blob</span><span class="o">/</span><span class="n">master</span><span class="o">/</span><span class="n">examples</span><span class="o">/</span><span class="n">tutorials</span><span class="o">/</span><span class="n">Advanced_Model_Training</span><span class="o">.</span><span class="n">ipynb</span><span class="p">}},</span> \n <span class="n">year</span><span class="o">=</span><span class="p">{</span><span class="mi">2021</span><span class="p">},</span> \n<span class="p">}</span> \n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n'},o=n(7294),i=n(7466),r=n.n(i);let c=()=>((0,o.useEffect)(()=>{var s,a;null===(s=document.getElementsByClassName("scroll-nav")[0])||void 0===s||s.remove();let n=document.querySelector(".notebook"),p=document.querySelector(".notebook");p&&n&&r().init(n,{sections:"h1, h2",insertTarget:p,insertLocation:"after"}),null==MathJax||null===(a=MathJax.Hub)||void 0===a||a.Queue(["Typeset",MathJax.Hub])},[]),(0,p.jsx)("div",{className:"overflow-x-scroll",dangerouslySetInnerHTML:{__html:"".concat(t.html," ").concat(l.Z)}}));c.Layout=e.Z;var d=c}},function(s){s.O(0,[8559,9774,2888,179],function(){return s(s.s=2483)}),_N_E=s.O()}]);